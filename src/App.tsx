import { useEffect, useState } from 'react';
import './App.css';
import FileUtils, { FileWithPath } from './FileUtils';
import { DefaultVideoFilter, DefaultArguments, Space, FormatsWithLoop } from './constants';
import { Args, VideoFilters } from './components';
import { Arguments, VideoFilter, WindowWithSystemAPI } from './types';
import { FormatsWithVideoFilter } from './constants';
import StringDictionary from './StringDictionary';

const System = (window as WindowWithSystemAPI).System;

const App = () => {
  // states
  const [command, setCommand] = useState<string|undefined>();
  const [videoFilter, setVideoFilter] = useState<VideoFilter>(DefaultVideoFilter);
  const [args, setArgs] = useState<Arguments>(DefaultArguments);
  const [platform, setPlatform] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  // effects
  useEffect(() => {
    System.platform().then((result) => {
      setPlatform(result);
    });
  }, []);
  // handlers
  const handleConvertClick = () => {
    const input = document.getElementById('inputFile') as HTMLInputElement;
    const file = input.files?.[0];
    const fileUtils:FileUtils = new FileUtils(file as FileWithPath);
    if (args.format === fileUtils.getFileType()) {
      setCommand(StringDictionary.errors.sameType);
      return;
    }
    const inputFile = StringDictionary.inputFile(fileUtils);
    const ffmpeg = StringDictionary.getFfmpegSource(args, platform);
    const argsList = [ffmpeg, inputFile];
    const outputFile = StringDictionary.outputFile(fileUtils, args);
    if (FormatsWithVideoFilter.includes(args.format)) {
      argsList.push(StringDictionary.vf(videoFilter));
    }
    if (FormatsWithLoop.includes(args.format)) {
      argsList.push(StringDictionary.loop(args));
    }
    argsList.push(outputFile);
    const _command = argsList.join(Space);
    setCommand(_command);
    System.execute(_command).then((result) => {
      setOutput(result);
    });
  };
  // render
  return (
    <div>
      <Args args={args} setArgs={setArgs}/>
      <table>
        <tbody>
          <tr>
            <td>input file</td>
            <td><input type="file" id="inputFile" /></td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button type="submit" id="submit" onClick={handleConvertClick}>Convert</button>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea id="textarea" value={command} readOnly />
            </td>
          </tr>
        </tbody>
      </table>
      {FormatsWithVideoFilter.includes(args.format) && <VideoFilters videoFilter={videoFilter} setVideoFilter={setVideoFilter} />}
      <div>
        Output:
        <textarea id="textarea" value={output} readOnly rows={10}/>
      </div>
    </div>
  );
}

export default App;
