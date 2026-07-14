"use client";

import { useState } from "react";


export default function SupportSurveyButton({
  fundraiserSlug
}:{
  fundraiserSlug:string;
}) {


  const [loading,setLoading] = useState(false);



  async function startSurvey(){

    setLoading(true);


    const res = await fetch(
      "/api/survey/start",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          fundraiserSlug
        })
      }
    );


    const data = await res.json();


    if(data.surveyUrl){

      window.location.href = data.surveyUrl;

    }


  }



  return (

    <button

      onClick={startSurvey}

      disabled={loading}

      className="
      bg-purple-600
      hover:bg-purple-700
      text-white
      px-8
      py-4
      rounded-xl
      font-bold
      text-lg
      "

    >

      {loading
      ? "Connecting..."
      : "📝 Support With Surveys"}

    </button>

  );

}
