import { PropsWithChildren } from 'react'

type CardProps = {
  title: React.ReactNode;
  actions: React.ReactNode;
}

export const Card = ({title, actions, children}: PropsWithChildren<CardProps>) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        {title && <p className="card-title">{title}</p>}
        {children}
        {actions && (
          <div className="card-actions justify-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
};
