import ItemController from './ItemController'
import InventoryController from './InventoryController'
import Settings from './Settings'
const Controllers = {
    ItemController: Object.assign(ItemController, ItemController),
InventoryController: Object.assign(InventoryController, InventoryController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers