import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useEffect, useRef, useState } from 'react';

const Popup = () => {
  const [ticketNumber, setTicketNumber] = useState<string>('');
  const prefix = 'hiretual';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input field when the component mounts
    inputRef.current?.focus();
  }, []);

  const goToTicket = () => {
    if (ticketNumber.trim()) {
      chrome.tabs.create({ url: `https://${prefix}.atlassian.net/browse/${ticketNumber}` });
    }
  };

  return (
    <div className={`App`}>
      {/* Go to any Ticket -------------- start */}
      <div>
        <input
          ref={inputRef}
          type="text"
          value={ticketNumber}
          onChange={e => setTicketNumber(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              goToTicket();
            }
          }}
          placeholder="Enter ticket number"
          className={`border-2 rounded-md p-1 border-gray-400`}
        />
        <button className={`bg-blue-500 text-white rounded-md p-2 m-2`} onClick={goToTicket}>
          Go to Ticket
        </button>
      </div>
      {/* Go to any Ticket -------------- end */}

      <div>
        If you have any issue or suggestion, please visit{' '}
        <a
          className="text-blue-400 font-bold hover:underline"
          href="https://github.com/VeejaLiu/ConfluenceSideNavbar/issues"
          target="_blank">
          github issue page
        </a>{' '}
        to report it.
      </div>

      <div className={'text-gray-500 text-sm mt-4'}>
        Explore with ease through our intuitive side navigation bar on Confluence!
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
