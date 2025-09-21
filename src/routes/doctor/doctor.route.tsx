import DoctorList from "../../components/dashboard/doctor/DoctorList/DoctorList";
import DoctorProfile from "../../components/dashboard/doctor/DoctorProfile/DoctorProfile";

const sampleDoctor = {
  name: "Dr. Ayesha Rahman",
  specialities: ["Cardiology", "Internal Medicine"],
  studies: ["MBBS - Dhaka Medical College", "FCPS - Cardiology", "MD - Internal Medicine"],
  totalExperience: 12,
  bmdcNumber: "BMDC-12345",
  currentlyWorking: "Square Hospital, Dhaka",
  description:
    "Dr. Ayesha Rahman is a dedicated cardiologist with over 12 years of experience in treating complex heart conditions. She is known for her compassionate care and evidence-based approach.",
  experienceDetail:
    "Worked at Apollo Hospitals for 5 years before joining Square Hospital. Specialized in interventional cardiology and preventive heart care.",
  images: [
    "https://randomuser.me/api/portraits/women/44.jpg", // main profile image
    "https://images.unsplash.com/photo-1580281658629-248aa6ca4e6c", // gallery 1
    "https://images.unsplash.com/photo-1576765607924-3baeed3b94b2", // gallery 2
  ],
};

console.log(sampleDoctor)


export const doctors = [       
      
  {
    path: 'doctor_profile',
    element: <DoctorProfile />
  },      
  {
    path: 'doctor_list',
    element: <DoctorList />
  },      
]