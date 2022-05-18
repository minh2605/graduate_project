export const getInitialsFromName = (name: string) => {
  const fullName: string[] = name.trim().split(" ");
  return (
    (fullName.shift()?.[0] ?? "") + (fullName.pop()?.[0] ?? "").toUpperCase()
  );
};
