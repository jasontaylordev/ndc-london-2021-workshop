/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.10.1.0 (NJsonSchema v10.3.3.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface ITodoItemsClient {
    postTodoItem(command: CreateTodoItemCommand): Observable<number>;
    putTodoItem(id: number, command: UpdateTodoItemCommand): Observable<void>;
    deleteTodoItem(id: number): Observable<void>;
}

@Injectable({
    providedIn: 'root'
})
export class TodoItemsClient implements ITodoItemsClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    postTodoItem(command: CreateTodoItemCommand): Observable<number> {
        let url_ = this.baseUrl + "/api/TodoItems";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPostTodoItem(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPostTodoItem(<any>response_);
                } catch (e) {
                    return <Observable<number>><any>_observableThrow(e);
                }
            } else
                return <Observable<number>><any>_observableThrow(response_);
        }));
    }

    protected processPostTodoItem(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <number>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<number>(<any>null);
    }

    putTodoItem(id: number, command: UpdateTodoItemCommand): Observable<void> {
        let url_ = this.baseUrl + "/api/TodoItems/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPutTodoItem(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPutTodoItem(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processPutTodoItem(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            result400 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status === 404) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result404: any = null;
            result404 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, result404);
            }));
        } else {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let resultdefault: any = null;
            resultdefault = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, resultdefault);
            }));
        }
    }

    deleteTodoItem(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/TodoItems/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteTodoItem(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteTodoItem(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteTodoItem(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status === 404) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result404: any = null;
            result404 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, result404);
            }));
        } else {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let resultdefault: any = null;
            resultdefault = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, resultdefault);
            }));
        }
    }
}

export interface ITodoListsClient {
    getTodoLists(): Observable<TodosVm>;
    postTodoList(command: CreateTodoListCommand): Observable<number>;
    putTodoList(id: number, command: UpdateTodoListCommand): Observable<void>;
    deleteTodoList(id: number): Observable<void>;
}

@Injectable({
    providedIn: 'root'
})
export class TodoListsClient implements ITodoListsClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getTodoLists(): Observable<TodosVm> {
        let url_ = this.baseUrl + "/api/TodoLists";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetTodoLists(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetTodoLists(<any>response_);
                } catch (e) {
                    return <Observable<TodosVm>><any>_observableThrow(e);
                }
            } else
                return <Observable<TodosVm>><any>_observableThrow(response_);
        }));
    }

    protected processGetTodoLists(response: HttpResponseBase): Observable<TodosVm> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <TodosVm>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<TodosVm>(<any>null);
    }

    postTodoList(command: CreateTodoListCommand): Observable<number> {
        let url_ = this.baseUrl + "/api/TodoLists";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPostTodoList(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPostTodoList(<any>response_);
                } catch (e) {
                    return <Observable<number>><any>_observableThrow(e);
                }
            } else
                return <Observable<number>><any>_observableThrow(response_);
        }));
    }

    protected processPostTodoList(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            result400 = _responseText === "" ? null : <ValidationProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <number>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<number>(<any>null);
    }

    putTodoList(id: number, command: UpdateTodoListCommand): Observable<void> {
        let url_ = this.baseUrl + "/api/TodoLists/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPutTodoList(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPutTodoList(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processPutTodoList(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result400: any = null;
            result400 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status === 404) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result404: any = null;
            result404 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, result404);
            }));
        } else {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let resultdefault: any = null;
            resultdefault = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, resultdefault);
            }));
        }
    }

    deleteTodoList(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/TodoLists/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteTodoList(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteTodoList(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteTodoList(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status === 404) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result404: any = null;
            result404 = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, result404);
            }));
        } else {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let resultdefault: any = null;
            resultdefault = _responseText === "" ? null : <ProblemDetails>JSON.parse(_responseText, this.jsonParseReviver);
            return throwException("A server side error occurred.", status, _responseText, _headers, resultdefault);
            }));
        }
    }
}

export interface IWeatherForecastClient {
    get(): Observable<WeatherForecast[]>;
}

@Injectable({
    providedIn: 'root'
})
export class WeatherForecastClient implements IWeatherForecastClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    get(): Observable<WeatherForecast[]> {
        let url_ = this.baseUrl + "/WeatherForecast";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<WeatherForecast[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<WeatherForecast[]>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<WeatherForecast[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <WeatherForecast[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WeatherForecast[]>(<any>null);
    }
}

export interface CreateTodoItemCommand {
    listId?: number;
    title?: string | undefined;
}

export interface ProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
    extensions?: { [key: string]: any; } | undefined;
}

export interface UpdateTodoItemCommand {
    id?: number;
    listId?: number;
    title?: string | undefined;
    done?: boolean;
    priority?: number;
    note?: string | undefined;
}

export interface TodosVm {
    priorityLevels?: LookupDto[] | undefined;
    lists?: TodoListDto[] | undefined;
}

export interface LookupDto {
    value?: number;
    name?: string | undefined;
}

export interface TodoListDto {
    id?: number;
    title?: string | undefined;
    colour?: string | undefined;
    items?: TodoItemDto[] | undefined;
}

export interface TodoItemDto {
    id?: number;
    listId?: number;
    title?: string | undefined;
    note?: string | undefined;
    done?: boolean;
    priority?: number;
}

export interface UpdateTodoListCommand {
    id?: number;
    title: string;
}

export interface ValidationProblemDetails extends ProblemDetails {
    errors?: { [key: string]: string[]; } | undefined;
}

export interface CreateTodoListCommand {
    title?: string | undefined;
}

export interface WeatherForecast {
    date?: Date;
    temperatureC?: number;
    temperatureF?: number;
    summary?: string | undefined;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}