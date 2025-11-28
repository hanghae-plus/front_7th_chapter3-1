import { createContext, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const modalContentVariants = cva(
  'max-h-[90vh] rounded-md bg-background shadow-lg font-roboto flex flex-col',
  {
    variants: {
      size: {
        sm: 'w-full max-w-[400px]',
        md: 'w-full max-w-[600px]',
        lg: 'w-full max-w-[900px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface ModalContextType {
  onClose: () => void;
}

interface ModalProps
  extends VariantProps<typeof modalContentVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalContext = createContext<ModalContextType | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal 컴포넌트 내부에서만 사용할 수 있습니다');
  }
  return context;
};

const Overlay = ({ children }: { children: React.ReactNode }) => {
  const { onClose } = useModalContext();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="bg-overlay p-md fixed inset-0 z-1000 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
};

const Modal = ({ open = true, onClose, size, children, className, ...props }: ModalProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <Overlay>
        <div
          className={modalContentVariants({ size, className })}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </Overlay>
    </ModalContext.Provider>,
    document.querySelector('#modalRoot')!
  );
};

const Header = ({ children, className, ...props }: ModalHeaderProps) => {
  const { onClose } = useModalContext();
  return (
    <div
      className={cn(
        'py-md px-xl flex items-center justify-between border-b border-border',
        className
      )}
      {...props}
    >
      <h3 className="h6 m-0">{children}</h3>
      <button
        className="transition-background-color flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 text-3xl leading-none text-foreground-subtle duration-150 ease-in-out hover:bg-hover-overlay"
        onClick={onClose}
        aria-label="Close modal"
      >
        ×
      </button>
    </div>
  );
};

const Content = ({ children, className, ...props }: ModalContentProps) => {
  return (
    <div className={cn('p-xl flex-1 overflow-y-auto', className)} {...props}>
      {children}
    </div>
  );
};

const Footer = ({ children, className, ...props }: ModalFooterProps) => {
  return (
    <div
      className={cn(
        'py-md px-xl gap-sm flex justify-end border-t border-border',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
