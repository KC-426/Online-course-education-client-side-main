import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCoursesQuery } from "../../redux/api/apiSlice";

const HomeCourses = () => {
  const { data: courses, isLoading, error, isError } = useGetCoursesQuery();

  const state = useSelector((state) => state.courses.allCourses);

  console.log(courses?.courses);

  // decide to render
  let content = null;
  // loader
  if (isLoading && !isError) {
    content = (
      <div className="container">
        <h2 className="text-center pt-10 alert alert-info mt-50">Loading...</h2>
      </div>
    );
  }

  if (!isLoading && !isError && courses?.length === 0) {
    content = <h2>No Courses Found</h2>;
  }

  if (!isLoading && !isError && courses.courses.length > 0) {
    content = state?.courses.slice(0, 6).map((course) => {
      console.log(course);
      return (
        <div key={course?._id} className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
          <div className="course__item white-bg transition-3 mb-30">
            <div className="course__thumb w-img fix course_thumb_height">
              <Link href={`/course-details/${course?._id}`}>
                <a>
                  <img
                    src={
                      course?.thumb_img?.url
                        ? course?.thumb_img?.url
                        : "/default.jpg"
                    }
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <div className="course__content p-relative">
              <div className="course__price">
                <span>${course?.amount}</span>
              </div>
              <div className="course__tag">
                <Link href={`/course-details/${course?._id}`}>
                  <a>{course?.category[0]}</a>
                </Link>
              </div>
              <h3 className="course__title">
                <Link href={`/course-details/${course?._id}`}>
                  <a>{course?.title}..</a>
                </Link>
              </h3>
              {/* <p>{course?.description}</p> */}

              {/* <div className="course__bottom d-sm-flex align-items-center justify-content-between">
                     <div className="course__tutor">
                        <Link href={`/course-details/${course?._id}`}>
                           <a>
                              <img src={course?.teacher_img} alt="" />
                              {course?.tutor_name}
                           </a>
                        </Link>
                     </div>
                     <div className="course__lesson">
                        <a><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M1 12.2V4.49999C1 1.7 1.70588 1 4.52941 1H9.47059C12.2941 1 13 1.7 13 4.49999V11.5C13 11.598 13 11.696 12.9929 11.794" stroke="#49535B" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M3.01176 10.0999H13V12.5498C13 13.9008 11.8918 14.9998 10.5294 14.9998H3.47059C2.10824 14.9998 1 13.9008 1 12.5498V12.0948C1 10.9959 1.90353 10.0999 3.01176 10.0999Z" stroke="#49535B" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M4.17647 4.5H9.82353" stroke="#49535B" strokeLinecap="round" strokeLinejoin="round" />
                           <path d="M4.17647 6.94995H7.70589" stroke="#49535B" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                           {course?.topic_covered }
                        </a>
                     </div>
                  </div> */}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <section className="course__area pt-115 pb-90 grey-bg-3">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="section__title-wrapper text-center mb-60">
                <span className="section__title-pre">Top Courses</span>
                <h2 className="section__title section__title-44">
                  Our Featured Courses
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing aelit, sed
                  do eiusmod
                </p>
              </div>
            </div>
          </div>
          <div className="row">{content}</div>
        </div>
      </section>
    </>
  );
};

export default HomeCourses;
