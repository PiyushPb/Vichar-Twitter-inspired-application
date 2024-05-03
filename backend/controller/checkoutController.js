import stripe from "stripe";
import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";

const generatePremiumToken = (user, selectedPlan) => {
  return jwt.sign({ id: user._id, plan: selectedPlan }, process.env.JWT_TOKEN, {
    expiresIn: 15,
  });
};

export const createCheckoutSession = async (req, res) => {
  const { userId, selectedPlan } = req.body;

  if (!userId || !selectedPlan) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  console.log(userId, selectedPlan);

  try {
    const user = await User.findById(userId);

    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userID = await user._id;

    const planDetails = getPlanDetails(selectedPlan);
    // process.env.STRIPE_SECRET_KET
    const stripeInstance = new stripe(
      "sk_test_51P7bN1SE7cdsrCHa9Nrj4Lt0wPHTrqHqbTnXLXV1Zh1Ncn2j7yDsdvCtdoxERhmICtR4PP823klQbI54dgMS3Akf00P3AaNoIt"
    );

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/success`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/cancel`,
      customer_email: user.email,
      // client_reference_id: userID || "dohaioiagfiuygaifhaoihy",
      line_items: [
        {
          price_data: {
            currency: "INR",
            unit_amount: planDetails.price * 100,
            product_data: {
              name: selectedPlan,
              description: planDetails.description,
            },
          },
          quantity: 1,
        },
      ],
    });

    if (!session) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create checkout session" });
    }

    const premiumToken = generatePremiumToken(user, selectedPlan);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          isVerified: true,
          plan: selectedPlan,
          premiumToken: premiumToken,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update user status" });
    }

    res
      .status(200)
      .json({ success: true, sessionId: session.url, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Function to get plan details based on plan name
const getPlanDetails = (plan) => {
  switch (plan) {
    case "basic":
      return {
        price: 199,
        description: "Vichar basic plan for 1 month",
      };
    case "premium":
      return {
        price: 399,
        description: "Vichar premium plan for 1 month",
      };
    case "premiumPlus":
      return {
        price: 599,
        description: "Vichar premium+ plan for 1 month",
      };
    default:
      return {
        price: 199,
        description: "Vichar basic plan for 1 month",
      };
  }
};
