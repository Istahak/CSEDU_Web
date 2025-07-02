import { Calendar } from "lucide-react"

interface AnnouncementCardProps {
  date: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export default function AnnouncementCard({ date, title, description, imageSrc, imageAlt }: AnnouncementCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              {date}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
          <div className="md:w-48 h-48 md:h-auto relative">
            <img src={imageSrc || "/cseduimage.svg"} alt={imageAlt} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}
