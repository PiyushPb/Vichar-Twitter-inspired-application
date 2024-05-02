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

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const planDetails = getPlanDetails(selectedPlan);
    // process.env.STRIPE_SECRET_KEY
    const stripeInstance = new stripe(
      "sk_test_51P7jdsSAihlO7Il702vWdKOQ9OdQJVNjv53S2lUPoWXO8Q4b7Ebf54Xjk6gSCM8z3tu3ipPxSCxDiXRDdWHIevyE00Mk7qIgeq"
    );

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/success`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/cancel`,
      customer_email: user.email,
      client_reference_id: user._id,
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
    res.status(500).json({ success: false, message: "Internal server error" });
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
