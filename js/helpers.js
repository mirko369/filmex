export function randomNum(size) {
  return Math.floor(Math.random() * (size + 1));
}

export function timeout(s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}
