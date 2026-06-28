
    export type RemoteKeys = 'greetingRemote/GreetingWidget';
    type PackageType<T> = T extends 'greetingRemote/GreetingWidget' ? typeof import('greetingRemote/GreetingWidget') :any;