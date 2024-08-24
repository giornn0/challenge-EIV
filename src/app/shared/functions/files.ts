export const handleFileEvent = (event: Event) => {
  const files = handleFilesEvent(event);
  if (!files) {
    return null;
  }
  return files[0];
};
export const handleFilesEvent = (event: Event) => {
  const target = <HTMLInputElement>event.target;
  if (!target.files) {
    return null;
  }
  return target.files;
};
