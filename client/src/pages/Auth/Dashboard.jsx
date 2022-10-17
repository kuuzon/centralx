import React from 'react';

// Import custom modules
import useAuth from '../../hooks/useAuth';
import CXCard from '../../components/common/CXCard';
import CXButton from '../../components/common/CXButton';

const Dashboard = () => {
  // HOOK: CONTEXT FOR AUTH
  const { user, logout } = useAuth();

  // CONDITIONAL LOAD: USER ERROR [POSSIBLY REPLACE WITH LOADING STATE]
  if (!user) {
    return (
      <CXCard title="Profile" authform>
        <div className="text-center mb-4">
          Cannot Retrieve User
        </div>
      </CXCard>
    )
  }

  return (
    <CXCard title="Profile" authform>
      <div className="text-center mb-4">
        <h4>Welcome {user.username}!</h4>
      </div>
      <p><strong>Email: </strong>{user.email}</p>
      { user.isAdmin && <p><strong>Secret: </strong> Hello Admin - nice to see you here</p>}

      {/* Log Out & Forces a Redirect */}
      { user &&
        <div className="mt-5">
          <CXButton onClick={() => { logout() }}>
            Log Out
          </CXButton>
        </div>
      }
    </CXCard>
  )
}

export default Dashboard