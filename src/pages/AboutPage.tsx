import { Code2, Sparkles, Database, Zap, Github, Linkedin, Mail } from 'lucide-react';

export default function AboutPage() {
  const skills = [
 {
    icon: Code2,
    title: 'Frontend',
    items: ['React','Vue.js','Angular', 'TypeScript', 'Tailwind CSS','JavaScript','HTML','CSS','Responsive Design']
  },
  {
    icon: Database,
    title: 'Backend & Database',
    items: ['C#','.NET ','Entity Framework Core','PostgreSQL','Redis','JWT Authentication','SQL Server', 'RESTful APIs']
  },
  {
    icon: Zap,
    title: 'Lightweight / Node & Scripts',
    items: ['Node.js','Express','Vanilla JS','SignalR', 'WebSockets', 'Event-Driven Architecture']
  },
  {
    icon: Sparkles,
    title: 'Tools, Architecture & Dev Practices',
    items: ['CQRS','MediatR','n8n Workflow Automation', 'AI Integration', 'Git', 'Agile Methodologies','Onion Architecture','FluentValidation','AutoMapper','Docker','Git']
  }];

 const projects = [
  {
    title: 'CineSpot',
    description:
      'ASP.NET Core MVC ve React + TypeScript kullanılarak geliştirilmiş modern bir film keşif ve inceleme platformu. Kullanıcılar film detaylarını görüntüleyebilir, listeler oluşturabilir ve etkileşimli arayüz üzerinden keşif deneyimi yaşayabilir.',
    tech: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'MSSQL', 'Bootstrap', 'Sass'],
  },
  {
    title: 'Kitaplik',
    description:
      'React (Vite) ve ASP.NET Core API mimarisi üzerine kurulu, SQLite veritabanı kullanan hızlı ve hafif bir CRUD kitaplık yönetim uygulaması.',
    tech: ['React', 'TypeScript', 'ASP.NET Core', 'SQLite', 'TailwindCSS'],
  },
  {
    title: 'SmartStore',
    description:
      'Stok yönetimi, kullanıcı işlemleri ve ürün takibi gibi özellikler sunan, full stack yapıda geliştirilmiş akıllı mağaza uygulaması.',
    tech: ['C#', '.NET', 'Entity Framework Core', 'MSSQL', 'Bootstrap', 'jQuery'],
  },
  {
    title: 'QuickPoll',
    description:
      'Gerçek zamanlı sonuç güncelleme özelliğine sahip interaktif anket uygulaması. ASP.NET Core MVC ve SignalR ile canlı veri akışı sağlar.',
    tech: ['C#', 'ASP.NET Core MVC', 'SignalR', 'Bootstrap', 'jQuery'],
  },
  {
    title: 'TaskManager',
    description:
      'Vue.js ile geliştirilmiş, tema desteği ve gelişmiş filtreleme özelliklerine sahip kullanıcı dostu görev yönetim uygulaması.',
    tech: ['Vue.js', 'JavaScript', 'CSS', 'Vuetify'],
  },
  {
    title: 'Portfolio',
    description:
      'Modern animasyonlar ve etkileyici UI/UX tasarımıyla hazırlanmış kişisel portfolyo sitesi. React ve Tailwind CSS ile geliştirildi.',
    tech: ['React', 'TypeScript', 'SCSS', 'Framer Motion', 'TailwindCSS'],
  },
  {
    title: 'InventoryPilot',
    description:
      'Stok ve envanter süreçlerini yönetmek için geliştirilen .NET tabanlı masaüstü/kurumsal uygulama.',
    tech: ['C#', '.NET', 'MSSQL', 'Bootstrap'],
  },
  {
    title: 'Techcareer.net Proje',
    description:
      'Eğitim kapsamında geliştirilen, modern arayüz ve kullanıcı etkileşimlerine odaklanan React tabanlı web uygulaması.',
    tech: ['React', 'JavaScript', 'CSS', 'Bootstrap'],
  },
  {
    title: 'RentACar',
    description:
      'Araç kiralama süreçlerini yönetmek için C# ve .NET ile geliştirilen kurumsal uygulama.',
    tech: ['C#', '.NET', 'MSSQL', 'Bootstrap'],
  },
  {
    title: 'TodoList',
    description:
      'Görev ekleme, düzenleme ve tamamlama gibi temel özelliklere sahip hafif bir görev takip uygulaması.',
    tech: ['C#', '.NET', 'MSSQL', 'Bootstrap'],
  },
];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[40vh] bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
        <div className="relative text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl shadow-2xl">
            👩‍💻
          </div>
          <h1 className="text-5xl font-bold mb-4">Esra Yılmaz</h1>
          <p className="text-xl text-gray-300">Full Stack Developer</p>
          <div className="flex gap-4 justify-center mt-6">
            <a
              href="https://github.com/esryllmz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/esrayllmz/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:dev.esrayilmaz@gmail.com"
              className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-red-600">→</span>
            Hakkımda
          </h2>
          <div className="bg-gray-900 rounded-lg p-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Merhaba! Ben Esra Yılmaz, 5+ yıllık deneyime sahip bir Full Stack Developer'ım.
              Modern web teknolojileri ve gerçek zamanlı uygulamalar geliştirme konusunda
              uzmanlaşmış durumdayım.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Frontend tarafında React ve Angular ile kullanıcı dostu, responsive ve performanslı
              arayüzler tasarlıyorum. Backend tarafında ise .NET Core ve SignalR kullanarak
              ölçeklenebilir ve güvenilir sistemler geliştiriyorum.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Özellikle gerçek zamanlı veri akışı gerektiren uygulamalarda (SignalR, WebSockets)
              ve modern workflow otomasyonlarında (n8n) deneyimliyim. Sürekli öğrenmeye ve yeni
              teknolojileri projelerime entegre etmeye meraklıyım.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-red-600">→</span>
            Teknik Yetenekler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-600 p-2 rounded-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{skill.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {skill.items.map((item, idx) => (
                      <li key={idx} className="text-gray-400 flex items-center gap-2">
                        <span className="text-red-600">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-red-600">→</span>
            Öne Çıkan Projeler
          </h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                <h3 className="text-2xl font-bold mb-3 text-red-600">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">İletişime Geçin</h2>
          <p className="text-lg mb-6">
            Birlikte çalışmak veya projeler hakkında konuşmak ister misiniz?
          </p>
          <a
            href="mailto:dev.esrayilmaz@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            <Mail className="w-5 h-5" />
            E-posta Gönder
          </a>
        </section>
      </div>
    </div>
  );
}
