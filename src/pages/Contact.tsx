import { Mail, MapPin } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <main className="min-h-screen pt-24 pb-16 flex items-center justify-center relative z-10">
      <Helmet>
        <title>Contact - Aryan Vishwakarma</title>
        <meta name="description" content="Get in touch with Aryan Vishwakarma, a Full Stack Developer specializing in React, Node.js, and modern web technologies." />
      </Helmet>
      <section className="w-full py-8 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md rounded-xl p-8">
              <div className="page-element">
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-300">
                  Have a question or want to work together? Drop me a message!
                </p>
              </div>

              <div className="space-y-6">
                {/* Removed infinite pulse from Mail icon */}
                <div className="flex items-center space-x-4 p-4 rounded-xl border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-400">
                      aaryannn3110@gmail.com
                    </p>
                  </div>
                </div>

                {/* Removed infinite pulse from MapPin icon */}
                <div className="flex items-center space-x-4 p-4 rounded-xl border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-pink-500/30 to-blue-500/30 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-400">
                      Kanpur, Uttar Pradesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] bg-black/40 backdrop-blur-md rounded-xl p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact