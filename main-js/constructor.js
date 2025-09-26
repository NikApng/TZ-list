function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getToLocalStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export { getToLocalStorage, saveToLocalStorage };