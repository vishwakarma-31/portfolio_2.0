import React, { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center relative z-10">
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
                      gAryan133@gmail.com
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="animate-on-scroll stagger-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-700/50 bg-white/5 text-white focus:border-blue-500 focus:outline-none transition-colors backdrop-blur-sm hover:scale-105 focus:scale-105"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="animate-on-scroll stagger-5">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-700/50 bg-white/5 text-white focus:border-blue-500 focus:outline-none transition-colors backdrop-blur-sm hover:scale-105 focus:scale-105"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="animate-on-scroll">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="w-full px-4 py-3 rounded-xl border border-gray-700/50 bg-white/5 text-white focus:border-blue-500 focus:outline-none transition-colors backdrop-blur-sm hover:scale-105 focus:scale-105"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="animate-on-scroll">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border resize-none border-gray-700/50 bg-white/5 text-white focus:border-blue-500 focus:outline-none transition-colors backdrop-blur-sm hover:scale-105 focus:scale-105"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="animate-on-scroll">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 animate-pulse" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact