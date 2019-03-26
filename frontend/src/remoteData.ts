export type StatusChangeHandler<T> = (remoteData: RemoteData<T>) => void;

// Typer
export enum RemoteDataStatus {
  NotAsked = 'NotAsked',
  Loading = 'Loading',
  Success = 'Success',
  Failure = 'Failure'
}

export type RemoteData<T> =
  | {
      status: RemoteDataStatus.NotAsked;
    }
  | {
      status: RemoteDataStatus.Loading;
    }
  | {
      status: RemoteDataStatus.Success;
      data: T;
    }
  | {
      status: RemoteDataStatus.Failure;
      reason: string;
    };

// Skapere
function success<T>(data: T): RemoteData<T> {
  return {
    status: RemoteDataStatus.Success,
    data
  };
}

function error<T>(reason: string): RemoteData<T> {
  return {
    status: RemoteDataStatus.Failure,
    reason
  };
}

function loading<T>(): RemoteData<T> {
  return {
    status: RemoteDataStatus.Loading
  };
}

function notAsked<T>(): RemoteData<T> {
  return {
    status: RemoteDataStatus.NotAsked
  };
}

// Eksponerte hjelpemetode
export function initializeRemoteData<T>(): RemoteData<T> {
  return notAsked<T>();
}

export function clearRemoteData<T>(remoteData: RemoteData<T>): RemoteData<T> {
  return initializeRemoteData<T>();
}

// Hent og send
export function getRemoteData<T>(
  url: string,
  onStatusChange: StatusChangeHandler<T>
) {
  onStatusChange(loading<T>());

  fetch(url)
    .then(res =>
      res.json().then((json: T) => {
        onStatusChange(success(json));
      })
    )
    .catch(reason => onStatusChange(error(reason)));
}

export function postRemoteData<T, R>(
  url: string,
  data: T,
  onStatusChange: StatusChangeHandler<R>
) {
  onStatusChange(loading<R>());

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json().then(json => onStatusChange(success(json as R))))
    .catch(reason => onStatusChange(error(reason)));
}
