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
            <div className="space-y-8 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-lg bg-gradient-to-br from-white/5 to-white/10 animate-on-scroll">
              <div className="page-element">
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-300">
                  Have a question or want to work together? Drop me a message!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-on-scroll stagger-1">
                  <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-400">
                      aaryannn3110@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-on-scroll stagger-2">
                  <div className="bg-gradient-to-br from-pink-500/30 to-blue-500/30 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-pink-400 animate-pulse" />
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

            <div className="backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 bg-white/5 transition-all duration-300 animate-on-scroll stagger-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact