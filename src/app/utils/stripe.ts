import Stripe from "stripe";
import envVars from "../config/envVars";


export const stripe = new Stripe(envVars.stripe_secret_key as string);