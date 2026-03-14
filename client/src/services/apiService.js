/**
 * Centralize all backend API calls here to make it easy to manage
 * base URLs, headers, and error handling.
 */

const API_BASE_URL = 'http://localhost:8080/api'; // Match the backend port

export const apiService = {
  // --- INGREDIENTS ---
  
  /**
   * Fetches the lookup list of ingredients from the database.
   * Expected return: { success: true, ingredients: [...] }
   */
  async getIngredients() {
    try {
      const response = await fetch(`${API_BASE_URL}/ingredients`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      throw error;
    }
  },

  // --- ORDERS ---

  /**
   * Submits a new order to the backend for price calculation and saving
   * @param {Array<Number>} slices - Array of ingredient IDs (e.g. [1, 2, 1, 3])
   * @param {Number} quantity - Total number of burgers
   * Expected return: { success: true, order: {...} }
   */
  async submitOrder(slices, quantity) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slices, quantity })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error submitting order:", error);
      throw error;
    }
  },

  /**
   * Fetches all past orders (sorted newest to oldest)
   */
  async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }
};
