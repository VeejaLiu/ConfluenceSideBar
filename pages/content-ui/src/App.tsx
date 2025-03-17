import { useEffect, useState } from 'react';

interface HeadingObject {
  text: string;
  href: string;
  level: number;
}

export default function App() {
  const [headings, setHeadings] = useState<HeadingObject[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    console.log('content ui loaded');

    // 查找所有标题并设置状态
    const content = document.querySelector('#content');
    if (content) {
      const headingObjs = getAllHeadingObjects(content);
      if (headingObjs.length > 0) {
        setHeadings(headingObjs);
      }
    }
  }, []);

  // 从原代码迁移的获取标题对象的函数
  const getAllHeadingObjects = (content: Element): HeadingObject[] => {
    const headings: NodeListOf<Element> = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingObjs: HeadingObject[] = [];

    for (const heading of headings) {
      let text = heading.textContent || '';
      const href = heading.id;
      const level = parseInt(heading.tagName[1]);
      headingObjs.push({
        text,
        href,
        level,
      });
    }

    // 确保最小级别为1
    const minLevel = Math.min(...headingObjs.map(obj => obj.level));
    if (minLevel > 1) {
      return headingObjs.map(obj => ({
        ...obj,
        level: obj.level - (minLevel - 1),
      }));
    }

    return headingObjs;
  };

  // 切换侧边栏可见性
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* 侧边栏切换按钮 */}
      <button
        className={`fixed
        right-0
        top-[45%]
        w-8 h-8
        border-none
        bg-gray-300
        text-black
        z-50
        rounded-tl-md
        rounded-bl-md
        transition-transform
        duration-300
        `}
        onClick={toggleVisibility}>
        <span className={`inline-block transition-transform duration-300 ${isVisible ? 'rotate-0' : 'rotate-180'}`}>
          ➤
        </span>
      </button>

      {/* 侧边栏内容 */}
      {headings.length > 0 && (
        <div
          className={`
          fixed
          right-0
          top-1/2
          h-1/2
          bg-gray-300
          p-4
          z-40
          rounded-tl-lg
          rounded-bl-lg
          overflow-y-auto
          overflow-x-hidden
          transform
          -translate-y-1/2
          transition-all
          duration-300
          ease-in-out
          ${isVisible ? 'w-72 opacity-100' : 'w-0 opacity-0 hidden transition-[width,opacity] delay-300'}
          `}
          style={{ transitionProperty: 'width, opacity' }}>
          <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {headings.map((heading, index) => (
              <a
                key={index}
                href={`#${heading.href}`}
                className="block whitespace-nowrap overflow-hidden text-ellipsis hover:underline"
                style={{
                  paddingLeft: `${(heading.level - 1) * 10}px`,
                  fontWeight: heading.level === 1 ? 'bold' : 'normal',
                }}
                title={heading.text}>
                {heading.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
