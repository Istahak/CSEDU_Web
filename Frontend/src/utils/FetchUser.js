// Utility function to return a hardcoded UUID
// You can import this function in any other file

export function getHardcodedUUID() {
//   return "ff23971c-fa26-412b-a4fc-a11cce8f5508";
    return localStorage.getItem('user_id');
}

export function getHardcodedStudentId() {
    // return "ff23971c-fa26-412b-a4fc-a11cce8f5508";
    return localStorage.getItem('profile_id');
  }

// Alternatively, you can export a hardcoded user object
// export const hardcodedUser = {
//   id: "123e4567-e89b-12d3-a456-426614174000",
//   name: "John Doe",
//   email: "john.doe@example.com"
// };
