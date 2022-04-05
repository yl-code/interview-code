const arr = ['asdaaf', 'aseraf', 'asahaf']; // a

const getPublic = (arr) => {
  let public = '';
  const first = arr[0];
  for (let i = 0; i < first.length; i++) {
    let matchCount = 0;

    for (let j = 1; j < arr.length; j++) {
      if (arr[j][i] === first[i]) {
        matchCount++;
      } else {
        break;
      }
    }

    if (matchCount === arr.length - 1) {
      public += first[i];
    } else {
      break;
    }
  }

  return public;
};

console.log(getPublic(arr));
