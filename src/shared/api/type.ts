export enum USER_TYPE_ENUM {
    BROKER = 'broker',
    SHIPPER = 'shipper',
    CARRIER = 'carrier', // DEPRECATED use FLEET_MANAGER
    // carrier related
    CARRIER_DISPATCHER = 'carrier_dispatcher',
    CARRIER_OPS_MANAGER = 'carrier_ops_manager',
    FLEET_MANAGER = 'fleet_manager',
    DRIVER = 'driver',
    SUPER_ADMIN_MANAGER = 'super_admin_manager',
    CONTACT = 'contact',
}

export type USER_TYPE = `${USER_TYPE_ENUM}`;
