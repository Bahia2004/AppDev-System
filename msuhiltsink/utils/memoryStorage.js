let inMemoryInventory = [];

function logInventoryUpdate(inventoryId, itemName, quantityAdded, oldQuantity, newQuantity) {
  inMemoryInventory.push({
    inventoryId,
    itemName,  // Store the item name
    quantityAdded,
    oldQuantity,
    newQuantity,
    timestamp: new Date(),
  });
}



function getInventoryHistory(inventoryId) {
  return inMemoryInventory.filter(log => log.inventoryId === inventoryId);
}

// Function to clear the log
function clearLogs() {
  inMemoryInventory = [];
}

module.exports = { logInventoryUpdate, getInventoryHistory, clearLogs };
