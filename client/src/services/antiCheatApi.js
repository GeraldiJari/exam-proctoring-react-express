export const sendSnapshot = async (payload) => {
  console.log("Snapshot sent:", payload.reason);
};

export const submitTest = async (payload) => {
  console.log("Test submitted:", payload.reason);
};
