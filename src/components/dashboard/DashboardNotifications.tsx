import { BellRing, Heart, MessageCircle, Repeat, User } from "lucide-react";

const DashboardNotifications = () => {
  const notifications = [
    {
      id: 1,
      type: "like",
      title: "Nouvelle mention",
      message: "Sarah a aimé ta citation « L’art de penser différemment ».",
      time: "Il y a 10 min",
    },
    {
      id: 2,
      type: "comment",
      title: "Nouveau commentaire",
      message: "Eliott a commenté ta publication : « Très inspirant 👏 ».",
      time: "Il y a 1 h",
    },
    {
      id: 3,
      type: "repost",
      title: "Citation repartagée",
      message: "Maya a repartagé ta citation dans son flux.",
      time: "Il y a 3 h",
    },
    {
      id: 4,
      type: "follow",
      title: "Nouvel abonné",
      message: "Adam vient de te suivre. Explorez vos idées ensemble !",
      time: "Hier",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="text-pink-400" size={20} />;
      case "comment":
        return <MessageCircle className="text-sky-400" size={20} />;
      case "repost":
        return <Repeat className="text-green-400" size={20} />;
      case "follow":
        return <User className="text-yellow-400" size={20} />;
      default:
        return <BellRing className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="w-full min-h-screen px-6 py-8 text-white mt-20">
      {/* Titre */}
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <BellRing size={28} className="text-white/90" />
        Notifications
      </h1>

      {/* Conteneur principal */}
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-all shadow-sm"
          >
            <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
            <div className="flex flex-col">
              <h3 className="text-white font-semibold text-base">{notif.title}</h3>
              <p className="text-gray-300 text-sm">{notif.message}</p>
              <span className="text-xs text-gray-400 mt-1">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardNotifications;
