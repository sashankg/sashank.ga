import { takeLatest } from 'redux-saga';
import { call, take, put, select } from 'redux-saga/effects';
import 'isomorphic-fetch';
import Github from 'github-api';
const gh = new Github();

export default function* rootSaga() {
    yield call(watchLocationChange)
}

function* watchLocationChange() {
    yield* takeLatest('@@router/LOCATION_CHANGE', handleLocationChange)
}

function* handleLocationChange({ payload }) {
    const pathname = payload.pathname;
    if(pathname.indexOf('programming/') != -1 && pathname.slice(-1) != '/') {
        yield call(fetchContents, '/portfolio/programming');
        yield put({ type: 'OPEN_PROJECT_REQUESTED' });
        const path = pathname.split('/').slice(-1)[0].toLowerCase();
        const meta = yield select((state) => {
            let project = null;
            for(let i = 0; i < state.contents.elements.length; i++) {
                if(state.contents.elements[i].path == path) {
                    project = state.contents.elements[i];
                    break;
                }
            }
            return project
        }) 
        try {
            const response = yield fetch(meta.url);
            const markdown = yield response.text();
            yield put({ type: 'OPEN_PROJECT_SUCCEEDED', markdown });
        }
        catch(error) {
            put({ type: 'OPEN_PROJECT_FAILED', error });
        }
    }
    else {
        yield call(fetchContents, pathname);
    }
}

function* fetchContents(pathname) {
    const path = pathname.substr(11);
    try {
        const contents = yield gh.getRepo('sashankg', 'Portfolio').getContents(null, path);
        const elements = contents.data.map((x) => { 
            return {
                url: x.download_url,
                name: x.name,
                type: getType(x),
                size: x.size,
            }
        });
        console.log(elements)
        if(elements[0].name == 'data.json') {
            const response = yield fetch(elements[0].url)
            const json = yield response.json();
            const data = json.data.map((x) => {
                return {
                    name: x.name,
                    path: x.name.replace(/ /g, "_").toLowerCase(),
                    type: 'project',
                    url: x.url,
                    background: x.background,
                }
            })
            console.log(data)
            yield put({ type: 'CONTENTS_SUCCEEDED', elements: data });
        }
        else {
            yield put({ type: 'CONTENTS_SUCCEEDED', elements });
        }
    } catch(error) {
        console.log(error);
        yield put({ type: 'CONTENTS_FAILED', error });
    }
}

function getType(x) {
    if(x.type == 'dir') {
        return 'dir';
    }
    const extension = x.path.substr((~-x.path.lastIndexOf(".") >>> 0) + 2);
    switch(extension) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            return 'image';
        case 'mp4':
        case 'mov':
        case 'm4v':
            return 'video';
        default:
            return null;
    }
}
