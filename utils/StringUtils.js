class StringUtils {
  static areStringArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  
    return true;
  }
  
  static verifyFormat(inputString) {
    const pattern = /^\+\d-\d{3}-\d{3}-\d{4}$/;
    return pattern.test(inputString);
  }
}

module.exports = StringUtils;