import axios from 'axios';
import LogEvent from "../schema/log.js";
import dotenv from 'dotenv';
dotenv.config();

const saveEvent = async (event_payload) => {
  try {
    const { event_name, event_owner, event_owner_name, description, event_status, event_type, event_type_id } = event_payload;

    let event_product_id = null;
    let event_productItem_id = null;
    let event_order_id = null;
    let event_user_id = null;

    if (event_type === "Product") {
      event_product_id = event_type_id;
    } else if (event_type === "ProductItem") {
      event_productItem_id = event_type_id;
    } else if (event_type === "Order") {
      event_order_id = event_type_id;
    } else if (event_type === "User") {
      event_user_id = event_type_id;
    }

    const logEvent = new LogEvent({
      event_name,
      event_owner,
      description,
      event_status,
      event_product_id,
      event_productItem_id,
      event_order_id,
      event_user_id
    });

    await logEvent.save(); 
    await sentDiscordWebhook(event_payload);

    return logEvent;
  } catch (error) {
    console.error("Error saving event:", error);
    return null;
  }
};

const sentDiscordWebhook = async (ev) => {
  const webhook_url = process.env.DISCORD_WEBHOOK_URL;

  const { event_name, event_owner, event_owner_name, description, event_status, event_type, event_type_id } = ev;

  let event_product_id = null;
  let event_productItem_id = null;
  let event_order_id = null;
  let event_user_id = null;
  let fields = null;

  if (event_type === "Product") {
    event_product_id = event_type_id;
    fields = `Product ID: ${event_product_id || "null"}`;
  } else if (event_type === "ProductItem") {
    event_productItem_id = event_type_id;
    fields = `ProductItem ID: ${event_productItem_id || "null"}`;
  } else if (event_type === "Order") {
    event_order_id = event_type_id;
    fields = `Order ID: ${event_order_id || "null"}`;
  } else if (event_type === "User") {
    event_user_id = event_type_id;
    fields = `User ID: ${event_user_id || "null"}`;
  }

  let descriptions = `[${event_owner_name}] ${event_name}`;
  let hueColor = "0";
  
  if (event_status === "Success") {
    hueColor = "7143256"
  } else if (event_status === "Failed") {
    hueColor = "16727100"
  } else {
    hueColor = "0"
  }

  const payload = {
    content: null,
    embeds: [
      {
        title: "Event Log:",
        description: descriptions,
        color: hueColor,
        fields: [{ name: "Target:", value: fields }],
        footer: {
          text: "ev.",
          icon_url: process.env.IconUrl
        },
        timestamp: new Date().toISOString()
      }
    ],
    attachments: []
  };

  try {
    await axios.post(webhook_url, payload);
    return true;
  } catch (error) {
    console.error("Error sending Discord webhook:", error);
    return false;
  }
};

export default saveEvent;
