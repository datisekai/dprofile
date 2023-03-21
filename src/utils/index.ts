export const generateArray = (length: number) =>
  Array.from(Array(length).keys());

export const showMissing = (res: any) => {
  return res.status(400).json({ success: false, message: "Missing field" });
};

export const showInternal = (res: any) => {
  return res.status(500).json({ success: false, message: "Internal server" });
};

export const textError = 'An error occurred, please try again later'