import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/lib/auth";

export default async function EditFundraiserPage({
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



  return (

    <main className="min-h-screen bg-gray-100 p-10">


      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">


        <h1 className="text-4xl font-bold text-purple-700 mb-8">
          Edit Fundraiser
        </h1>



        <form

          action="/api/fundraiser/update"

          method="POST"

          className="space-y-6"

        >



          <input

            type="hidden"

            name="id"

            value={fundraiser.id}

          />





          <div>

            <label className="block font-semibold mb-2">
              Title
            </label>


            <input

              name="title"

              defaultValue={fundraiser.title}

              className="w-full border rounded-xl p-4"

            />


          </div>






          <div>

            <label className="block font-semibold mb-2">
              Story
            </label>


            <textarea

              name="story"

              rows={6}

              defaultValue={fundraiser.story}

              className="w-full border rounded-xl p-4"

            />


          </div>







          <div>

            <label className="block font-semibold mb-2">
              Category
            </label>


            <input

              name="category"

              defaultValue={fundraiser.category}

              className="w-full border rounded-xl p-4"

            />


          </div>







          <div>

            <label className="block font-semibold mb-2">
              Goal Amount
            </label>


            <input

              name="goalAmount"

              type="number"

              step="0.01"

              defaultValue={fundraiser.goalAmount}

              className="w-full border rounded-xl p-4"

            />


          </div>







          <div className="flex gap-4">


            <button

              type="submit"

              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold"

            >

              Save Changes

            </button>




            <Link

              href="/dashboard"

              className="bg-gray-200 px-8 py-4 rounded-xl font-bold"

            >

              Cancel

            </Link>



          </div>




        </form>



      </div>


    </main>

  );

}
