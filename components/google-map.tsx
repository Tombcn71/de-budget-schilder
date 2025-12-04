interface GoogleMapProps {
  location: string
  title?: string
}

export function GoogleMap({ location, title }: GoogleMapProps) {
  // Google Maps embed URL
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location)}&zoom=12`

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
      )}
      <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg border border-border">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Kaart van ${location}`}
        />
      </div>
      <p className="text-center text-sm text-muted-foreground mt-3">
        We werken in heel Haaglanden
      </p>
    </div>
  )
}

