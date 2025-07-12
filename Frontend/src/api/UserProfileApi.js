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
        const response = await fetch(`${VITE_BACKEND_URL}/student_profile/by_user/${getHardcodedUUID()}`);
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

