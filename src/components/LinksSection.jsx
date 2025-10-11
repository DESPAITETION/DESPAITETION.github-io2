import React from 'react';
import { Card, Typography, List, Image } from 'antd';

const { Title, Paragraph } = Typography;

const LinksSection = () => {
  const linksData = [
    { href: "http://kubsu.ru", text: "Абсолютная гиперссылка на kubsu.ru" },
    { href: "https://kubsu.ru", text: "Абсолютная гиперссылка на kubsu.ru (HTTPS)" },
    { href: "/integral-page", text: "Сокращенная ссылка на внутреннюю страницу" },
    { href: "/", text: "Сокращенная ссылка на главную страницу" },
    { href: "#fragment", text: "Ссылка на фрагмент текущей страницы" },
    { href: "page.html?param1=value1&param2=value2&param3=value3", text: "Ссылка с тремя параметрами" },
    { href: "page.html?id=123", text: "Ссылка с параметром id" },
    { href: "current.html", text: "Относительная ссылка в текущем каталоге" },
    { href: "about/page.html", text: "Относительная ссылка в каталоге about" },
    { href: "../page.html", text: "Относительная ссылка уровнем выше" },
    { href: "../../page.html", text: "Относительная ссылка двумя уровнями выше" },
    { text: "Это контекстная ссылка в тексте абзаца", context: true },
    { href: "https://example.com/page#section", text: "Ссылка на фрагмент стороннего сайта" },
    { type: "image-map" },
    { href: "", text: "Ссылка с пустым href" },
    { text: "Ссылка без href", noHref: true },
    { href: "page.html", rel: "nofollow", text: "Ссылка без перехода поисковиками" },
    { href: "page.html", rel: "noindex", text: "Ссылка без индексации поисковиками" },
    { type: "numbered-list" },
    { href: "ftp://user:password@ftp.example.com/file.txt", text: "FTP ссылка с авторизацией" }
  ];

  const renderLinkItem = (item, index) => {
    if (item.type === "image-map") {
      return (
        <List.Item>
          <Image
            src="/DESPAITETION.github-io2/image1.jpg"
            alt="Карта-изображение"
            className="image-map"
            width={300}
            height={200}
            preview={false}
          />
          <map name="imageMap">
            <area shape="rect" coords="0,0,150,100" href="rect.html" alt="Прямоугольная область" />
            <area shape="circle" coords="225,150,50" href="circle.html" alt="Круглая область" />
          </map>
        </List.Item>
      );
    }

    if (item.type === "numbered-list") {
      return (
        <List.Item>
          <ol>
            <li style={{ marginBottom: 8 }}>
              <a href="page1.html" title="Подсказка 1" className="custom-link">
                Ссылка 1 с title
              </a>
            </li>
            <li style={{ marginBottom: 8 }}>
              <a href="page2.html" title="Подсказка 2" className="custom-link">
                Ссылка 2 с title
              </a>
            </li>
            <li style={{ marginBottom: 8 }}>
              <a href="page3.html" title="Подсказка 3" className="custom-link">
                Ссылка 3 с title
              </a>
            </li>
          </ol>
        </List.Item>
      );
    }

    if (item.context) {
      return (
        <List.Item>
          Это <a href="page.html" className="custom-link">контекстная ссылка</a> в тексте абзаца
        </List.Item>
      );
    }

    if (item.noHref) {
      return (
        <List.Item>
          <a className="custom-link">{item.text}</a>
        </List.Item>
      );
    }

    return (
      <List.Item>
        <a 
          href={item.href} 
          rel={item.rel}
          className="custom-link"
          style={{ display: 'block' }}
        >
          {item.text}
        </a>
      </List.Item>
    );
  };

  return (
    <Card 
      id="links"
      className="custom-card"
      style={{ marginBottom: 0 }}
    >
      <Title level={2} style={{ marginBottom: 24 }}>
        Список гиперссылок
      </Title>
      
      <List
        size="large"
        dataSource={linksData}
        renderItem={renderLinkItem}
        style={{ marginBottom: 32 }}
      />

      <Title id="fragment" level={2} style={{ marginBottom: 16 }}>
        Фрагмент страницы
      </Title>
      <Paragraph>
        Это фрагмент, на который ведет ссылка из списка.
      </Paragraph>
    </Card>
  );
};

export default LinksSection;