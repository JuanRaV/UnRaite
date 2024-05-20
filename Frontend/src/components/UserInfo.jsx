import React from 'react';
import PassengerInfo from './AdminPassanger';
import DriverInfo from './AdminDrivers';
const UserInfo = ({ userType, user, raite }) => {
  return (
    <div>
      {userType === 'driver' ? (
        <DriverInfo driver={user} raite={raite} />
      ) : (
        <PassengerInfo passenger={user} raite={raite} />
      )}
    </div>
  );
};

export default UserInfo;
