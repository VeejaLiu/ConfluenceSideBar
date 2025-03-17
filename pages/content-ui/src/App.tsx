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
        `}
        onClick={toggleVisibility}>
        <span className={`${isVisible ? 'rotate-0' : 'rotate-180'}`}>➤</span>
      </button>

      {/* 侧边栏内容 */}
      {headings.length > 0 && (
        <div
          className={`
          fixed
          right-0
          top-1/2
          w-72
          h-1/2
          bg-gray-300
          p-4
          z-40
          rounded-tl-lg
          rounded-bl-lg
          overflow-y-scroll
          overflow-x-hidden
          transform
          -translate-y-1/2
          ${!isVisible ? 'hidden' : ''}`}>
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
      )}
    </>
  );
}
