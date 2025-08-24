


export default function DonationSection() {
    return (
        <section className="py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Together, We Make a Difference
            </h2>
            <p className="text-blueGray-600 mb-6">
              Every donation, every volunteer hour, and every campaign helps
              us reach more children and families in need. Thank you for being
              part of our journey!
            </p>
            <a
              href="/donate"
              className="bg-lightBlue-500 text-white px-6 py-3 rounded font-bold shadow hover:bg-lightBlue-600 transition"
            >
              Donate Now
            </a>
          </div>
        </section>
    )
}