import { RawIntro, Intro } from '../../model';

export const rawIntroToIntro = (rawIntro: RawIntro): Intro => {
	const result: any = {};

	result.body = rawIntro.intro_text;
	result.saved = true;

	return result as Intro;
}
