import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { SITE_URL } from "@/app/lib/config";

import ShareButton from "@/components/ShareButton";


export default async function SharePage({
  params,
}: {
  params: {
    id: string;
  };
}) {


  const session = await getServerSession(authOptions);


  if (!session?.user?.email) {
    redirect("/login");
  }



  const user = await prisma.user.findUnique({

    where: {
      email: session.user.email,
    },

  });



  if (!user) {
    redirect("/login");
  }




  const fundraiser = await prisma.fundraiser.findFirst({

    where: {

      id: params.id,

      userId: user.id,

    },

  });




  if (!fundraiser) {
    notFound();
  }





  const base = SITE_URL.replace(/\/$/, "");
  const shareUrl = `${base}/f/${fundraiser.slug}`;




  return (

    <main className="min-h-screen bg-gray-100 p-10">


      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">


        <h1 className="text-4xl font-bold text-purple-700 mb-4">

          Share Your Fundraiser

        </h1>



        <p className="text-gray-600 mb-8">

          Share your fundraiser and let people support with surveys.

        </p>





        <div className="bg-purple-50 rounded-2xl p-6 mb-8">


          <h2 className="text-2xl font-bold">

            {fundraiser.title}

          </h2>


          <p className="text-gray-600 mt-2">

            {fundraiser.category}

          </p>


        </div>







        <div>


          <label className="font-semibold">

            Fundraiser Link

          </label>



          <div className="flex gap-3 mt-2">


            <input

              readOnly

              value={shareUrl}

              className="flex-1 border rounded-xl p-4"

            />



            <ShareButton
              url={shareUrl}
              title={fundraiser.title}
            />



          </div>


        </div>







        <div className="mt-8 grid gap-4">


          <a

            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}

            target="_blank"

            className="bg-blue-600 text-white text-center py-3 rounded-xl font-bold"

          >

            Share on Facebook

          </a>





          <a

            href={`https://twitter.com/intent/tweet?url=${shareUrl}`}

            target="_blank"

            className="bg-black text-white text-center py-3 rounded-xl font-bold"

          >

            Share on X

          </a>





          <a

            href={`mailto:?subject=Support ${fundraiser.title}&body=${shareUrl}`}

            className="bg-gray-700 text-white text-center py-3 rounded-xl font-bold"

          >

            Share Email

          </a>


        </div>







        <Link

          href="/dashboard"

          className="inline-block mt-8 text-purple-700 font-bold"

        >

          ← Back to Dashboard

        </Link>




      </div>


    </main>

  );


}
