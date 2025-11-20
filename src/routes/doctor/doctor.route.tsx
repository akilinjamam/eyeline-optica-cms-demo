import DoctorList from "../../components/dashboard/doctor/DoctorList/DoctorList";
import DoctorProfile from "../../components/dashboard/doctor/DoctorProfile/DoctorProfile";
import MyPatients from "../../components/dashboard/doctor/Patients/MyPatients";
import AddPrescription from "../../components/dashboard/doctor/prescription/AddPrescription";
import PrescriptionPage from "../../components/dashboard/doctor/prescription/MyPrescription";
import PrescriptionLanding from "../../components/dashboard/doctor/prescription/PrescriptionLending";
import AddSchedule from "../../components/dashboard/doctor/Schedule/AddSchedule";
import ScheduleLanding from "../../components/dashboard/doctor/Schedule/ScheduleLanding";
import ScheduleList from "../../components/dashboard/doctor/Schedule/ScheduleList";

export const doctors = [       
      
  {
    path: 'doctor_profile',
    element: <DoctorProfile />
  },      
  {
    path: 'doctor_list',
    element: <DoctorList />
  },      
  {
    path: 'doctor_schedule',
    element: <ScheduleLanding />
  },      
  {
    path: 'add_schedule',
    element: <AddSchedule />
  },      
  {
    path: 'my_schedule',
    element: <ScheduleList/>
  },      
  {
    path: 'doctor_prescription',
    element: <PrescriptionLanding/>
  },      
  {
    path: 'add_prescription',
    element: <AddPrescription/>
  },      
  {
    path: 'my_prescriptions',
    element: <PrescriptionPage/>
  },      
  {
    path: 'doctor_patients',
    element: <MyPatients/>
  },      
]