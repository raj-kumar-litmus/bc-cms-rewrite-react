import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import configurations from "../config";

function MenuChooser() {
  const { search } = useLocation();
  const [memberGroups, setGroups] = useState([]);
  const { azureUserGroups } = configurations[process.env.NODE_ENV];

  useEffect(() => {
    if (azureUserGroups && search) {
      const groups = new URLSearchParams(search).get("groups").split(",");
      const groupsToAccess = groups
        .filter((groupId) => !!azureUserGroups[groupId])
        .map((id) => azureUserGroups[id]);
      if (groupsToAccess) {
        setGroups(groupsToAccess);
      }
    }
  }, [azureUserGroups, search]);

  return (
    <div>
      {memberGroups.map((e) => (
        <p key={e}>{e}</p>
      ))}
    </div>
  );
}

export default MenuChooser;
