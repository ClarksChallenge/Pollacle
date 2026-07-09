"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateFundraiserPage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [category, setCategory] = useState("Medical");

  const [loading, setLoading] = useState(false);
  const [createdSlug, setCreatedSlug] = useState("");



  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);


    try {

      const res = await fetch("/api/fundraiser/create", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          title,
          story,
          goalAmount: Number(goalAmount),
          category,

        }),

      });



      const data = await res.json();



      if (data.slug) {

        setCreatedSlug(data.slug);

      } else {

        alert(data.error || "Unable to create fundraiser.");

      }


    } catch (error) {

      console.error(error);

      alert("Something went wrong creating your fundraiser.");

    }


    setLoading(false);

  }





  if (createdSlug) {


    return (

      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">


        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-10 text-center">


          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            Your Fundraiser Is Live!
          </h1>


          <p className="text-gray-600 mb-8">

            Your fundraiser has been created successfully.
            Share your link and start getting support.

          </p>




          <div className="bg-purple-50 rounded-xl p-5 mb-8">


            <p className="font-semibold mb-2">
              Your fundraiser link:
            </p>


            <p className="text-purple-700 font-bold break-all">

              {typeof window !== "undefined" &&
                window.location.origin}

              /f/{createdSlug}

            </p>


          </div>





          <button

            onClick={() =>

              navigator.clipboard.writeText(

                `${window.location.origin}/f/${createdSlug}`

              )

            }

            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl mb-4"

          >

            Copy Share Link

          </button>





          <button

            onClick={() =>
              router.push(`/f/${createdSlug}`)
            }

            className="w-full border border-purple-600 text-purple-700 font-bold py-4 rounded-xl"

          >

            View Fundraiser

          </button>



        </div>


      </main>

    );

  }





  return (

    <main className="min-h-screen bg-gray-100 py-12 px-6">


      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">





        {/* CREATE FORM */}


        <div className="bg-white rounded-2xl shadow-xl p-8">


          <h1 className="text-4xl font-bold mb-3">
            Start Your Fundraiser
          </h1>


          <p className="text-gray-600 mb-8">

            Create your fundraiser and let supporters help through surveys.

          </p>





          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >





            <div>

              <label className="font-semibold block mb-2">
                Fundraiser Title
              </label>


              <input

                required

                value={title}

                onChange={(e) => setTitle(e.target.value)}

                className="w-full border rounded-xl p-3"

                placeholder="Help Save Bella"

              />

            </div>





            <div>

              <label className="font-semibold block mb-2">
                Story
              </label>


              <textarea

                required

                rows={6}

                value={story}

                onChange={(e) => setStory(e.target.value)}

                className="w-full border rounded-xl p-3"

                placeholder="Tell your story..."

              />

            </div>





            <div>

              <label className="font-semibold block mb-2">
                Goal Amount
              </label>


              <input

                required

                type="number"

                min="1"

                value={goalAmount}

                onChange={(e) => setGoalAmount(e.target.value)}

                className="w-full border rounded-xl p-3"

                placeholder="5000"

              />

            </div>





            <div>

              <label className="font-semibold block mb-2">
                Category
              </label>


              <select

                value={category}

                onChange={(e) => setCategory(e.target.value)}

                className="w-full border rounded-xl p-3"

              >

                <option>Medical</option>
                <option>Animals</option>
                <option>Education</option>
                <option>Community</option>
                <option>Emergency</option>
                <option>Other</option>


              </select>


            </div>





            <button

              disabled={loading}

              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl"

            >

              {loading
                ? "Creating..."
                : "Launch Fundraiser"}

            </button>



          </form>


        </div>







        {/* LIVE PREVIEW */}



        <div>


          <h2 className="text-2xl font-bold mb-4">
            Live Preview
          </h2>



          <div className="bg-white rounded-2xl shadow-xl p-8">



            <h1 className="text-3xl font-bold mb-4">

              {title || "Your Fundraiser Title"}

            </h1>




            <p className="text-gray-600 mb-8">

              {story || "Your fundraiser story will appear here."}

            </p>




            <div className="flex justify-between mb-2">

              <span className="font-bold">
                $0.00 Raised
              </span>


              <span>
                Goal ${goalAmount || "0"}
              </span>


            </div>




            <div className="w-full h-5 bg-gray-200 rounded-full">

              <div className="bg-purple-600 h-5 rounded-full w-0" />

            </div>




            <div className="mt-6 bg-purple-50 rounded-xl p-5">


              <p className="font-bold text-purple-700">

                Support With Surveys

              </p>


              <p className="text-gray-600 mt-2">

                Supporters help your fundraiser without donating their own money.

              </p>


            </div>



          </div>


        </div>




      </div>


    </main>

  );

}
