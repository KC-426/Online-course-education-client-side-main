import React from 'react';
import Link from 'next/link';
import { useGetTeamsQuery } from '../../redux/api/apiSlice';

const TeamArea = () => {
   const {data:teams,isLoading,error,isError} = useGetTeamsQuery();
   // decide to render
   let content = null;
   // loader
   if (isLoading && !isError) {
      content = <div className="container">
      <h2 className="text-center pt-10 alert alert-info mt-50">Loading...</h2>
    </div>
   }
 
   if(!isLoading && !isError && teams?.length === 0){
      content = <h2>No Teams Found</h2>
   }
 
   if(!isLoading && !isError && teams.length > 0){
      content = teams.map(team => {
         return <div key={team?._id} className="col-xxl-3 col-xl-3 col-lg-4 col-md-6">
            <div className="team__item text-center mb-40">
               <div className="team__thumb">
                  <div className="team__shape">
                     <img src={team?.shape} alt="" />
                  </div>
                  <img src={team?.team_sm_img} alt="" />
                  <div className="team__social transition-3">
                     <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                     <a href="#"><i className="fa-brands fa-twitter"></i></a>
                     <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                     <a href="#"><i className="fa-brands fa-pinterest-p"></i></a>
                  </div>
               </div>
               <div className="team__content">
                  <h3 className="team__title">
                     <Link href={`/team-details/${team?._id}`}>
                        <a >{team?.name}</a>
                     </Link>
                  </h3>
                  <span className="team__designation">Professor</span>
               </div>
            </div>
         </div>
      })
   }

   return (
      <>
         <section className="team__area pt-115">
            <div className="container">
               <div className="row align-items-end">
                  <div className="col-xxl-6 col-xl-6 col-lg-6">
                     <div className="section__title-wrapper-2 mb-40">
                        <span className="section__title-pre-2">Top Instructors</span>
                        <h3 className="section__title-2">Become A Instruction Instructor.</h3>
                     </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6">
                     <div className="team__wrapper mb-45 pl-70">
                        <p>Placerat veritatis ullamco rutrum quia illo, aenean eaque necessitatibus aptent vehicula porta? Sollicitudin id, laboris commodi! </p>
                     </div>
                  </div>
               </div>
               <div className="row">
                  {content}
               </div>
            </div>
         </section>
      </>
   );
};

export default TeamArea;