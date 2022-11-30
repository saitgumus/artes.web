export const OperationClaim = {
    GetUsersQuery: 3,
    CreateUserCommand: 4,
    UpdateUserCommand: 6,
    GetHotelsQuery: 89,
    SaveHotelCommand: 92,
    UpdateHotelCommand: 93,
    GetBrasscoDevicesQuery: 175,
    CreateBrasscoDeviceCommand: 176,
    DeleteBrasscoDeviceCommand: 177,
}
export const ClaimNames = {
    GET_HOTELS_QUERY: 'GetHotelsQuery',
    SAVE_HOTEL_COMMAND: 'SaveHotelCommand',
    UPDATE_HOTEL_COMMAND: 'UpdateHotelCommand',
    GET_BRASSCO_DEVICES_QUERY: 'GetBrasscoDevicesQuery',
    CREATE_BRASSCO_DEVICE_COMMAND: 'CreateBrasscoDeviceCommand',
    DELETE_BRASSCO_DEVICE_COMMAND: 'DeleteBrasscoDeviceCommand',
    GET_USERS_QUERY: 'GetUsersQuery',
    CREATE_USER_COMMAND: 'CreateUserCommand',
    UPDATE_USER_COMMAND: 'UpdateUserCommand'
}
export const HotelPageClaims = [ClaimNames.GET_HOTELS_QUERY,
    ClaimNames.SAVE_HOTEL_COMMAND,
    ClaimNames.UPDATE_HOTEL_COMMAND]

export const DevicePageClaims = [
    ClaimNames.GET_BRASSCO_DEVICES_QUERY,
    ClaimNames.CREATE_BRASSCO_DEVICE_COMMAND,
    ClaimNames.DELETE_BRASSCO_DEVICE_COMMAND
]

export const UserPageClaims = [
    ClaimNames.GET_USERS_QUERY,
    ClaimNames.CREATE_USER_COMMAND,
    ClaimNames.UPDATE_USER_COMMAND
]
