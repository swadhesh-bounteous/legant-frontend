const getCookie = (name:string) => {
    const cookieArr = document.cookie.split(";");
  
    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split("=");
  
      // Remove leading spaces and compare cookie name
      if (cookiePair[0].trim() === name) {
        return decodeURIComponent(cookiePair[1]); // Return the value
      }
    }
  
    return null; // Return null if the cookie is not found
  };
  