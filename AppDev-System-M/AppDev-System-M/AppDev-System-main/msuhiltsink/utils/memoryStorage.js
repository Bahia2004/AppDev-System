let inMemoryInventory = [];

// Function to log inventory updates
function logInventoryUpdate(inventoryId, quantityAdded) {
  inMemoryInventory.push({ inventoryId, quantityAdded, timestamp: new Date() });
}

// Function to get inventory history from memory
function getInventoryHistory(inventoryId) {
  return inMemoryInventory.filter(log => log.inventoryId === inventoryId);
}

// Function to clear the log
function clearLogs() {
  inMemoryInventory = [];
}

module.exports = { logInventoryUpdate, getInventoryHistory, clearLogs };
