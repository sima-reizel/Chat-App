const groups = [];

export const createGroup = (req, res) => {
  const { groupName } = req.body;
  if (groups.includes(groupName)) {
    return res.status(400).json({ message: 'Group already exists' });
  }
  groups.push(groupName);
  res.status(201).json({ message: 'Group created', groupName });
};

export const joinGroup = (req, res) => {
  const { groupName } = req.body;
  if (!groups.includes(groupName)) {
    return res.status(404).json({ message: 'Group not found' });
  }
  res.json({ message: 'Joined group', groupName });
};

export const getGroups = (req, res) => {
  res.json(groups);
};