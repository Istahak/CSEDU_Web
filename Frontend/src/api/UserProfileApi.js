import ApiService from './ApiService';
import API_CONFIG from './config';
import { getHardcodedUUID } from '../utils/FetchUser';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch projects for the current student using profile_id from localStorage
export async function getProjectsByAuthor() {
    const profileId = localStorage.getItem('user_id');
    if (!profileId) {
        console.error("No profile_id found in localStorage.");
        return null;
    }
    try {
        const response = await fetch(`${VITE_BACKEND_URL}/project/by-author/${profileId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getUserData(){
    try{
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`${VITE_BACKEND_URL}/student_profile/by_user/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function submitAssignment(formData, assignment_id, student_id, comment){
    try{
        const response = await fetch(`${VITE_BACKEND_URL}/assignment_submissions?assignment_id=${assignment_id}&student_id=${student_id}&comment=${comment}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
        return null;
    }
}

// Fetch courses for a given semester
export async function getCoursesBySemester(semester) {
    try {
        const response = await fetch(`${VITE_BACKEND_URL}/courses/filter/semester?semester=${encodeURIComponent(semester)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getAcademicRecords() {
    const studentId = localStorage.getItem('profile_id');
    try {
        const response = await fetch(`${VITE_BACKEND_URL}/gpa/academic-records/?student_id=${studentId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function payUserPayment(paymentId) {
    try {
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`${VITE_BACKEND_URL}/payment-users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payment_id: paymentId,
                user_id: userId,
                is_paid: true,
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getPayments() {
    try {
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`${VITE_BACKEND_URL}/payments/by-user/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.payments;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fetch pending assignments for the logged-in student
export async function getPendingAssignments() {
    try {
      const studentId = localStorage.getItem('profile_id');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments/student/${studentId}/pending`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  // Fetch submitted assignments for the logged-in student
  export async function getSubmittedAssignments() {
    try {
      const studentId = localStorage.getItem('profile_id');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments/student/${studentId}/submitted`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  // Fetch missing assignments for the logged-in student
  export async function getMissingAssignments() {
    try {
      const studentId = localStorage.getItem('profile_id');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments/student/${studentId}/missing`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }